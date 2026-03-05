import React, { useEffect, useRef, useState } from 'react';
import { svgString } from './beer.svg';

interface Dimensions {
    width: number;
    height: number;
}

class MugParticle {
    x: number;
    y: number;
    size: number;
    speed: number;
    swing: number;
    swingSpeed: number;
    rotation: number;
    rotationSpeed: number;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height;
        this.size = 30 + Math.random() * 20;
        this.speed = 1 + Math.random() * 3;
        this.swing = Math.random() * Math.PI * 2;
        this.swingSpeed = 0.02 + Math.random() * 0.03;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
    }

    update(width: number, height: number): void {
        this.y += this.speed;
        this.swing += this.swingSpeed;
        this.x += Math.sin(this.swing) * 0.5;
        this.rotation += this.rotationSpeed;

        if (this.y > height + this.size) {
            this.y = -this.size;
            this.x = Math.random() * width;
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
    }

    draw(ctx: CanvasRenderingContext2D, mugImage: HTMLImageElement): void {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(
            mugImage,
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size,
        );
        ctx.restore();
    }
}

export const BeerMugsSnow: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState<Dimensions>({
        width: 0,
        height: 0,
    });
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let isMounted = true; // Флаг для предотвращения обновления после размонтирования

        const initAnimation = async () => {
            // Создаем изображение из SVG
            const svgBase64 = btoa(unescape(encodeURIComponent(svgString)));
            const dataUrl = `data:image/svg+xml;base64,${svgBase64}`;

            const mugImage = new Image();

            // Ждем загрузки изображения
            await new Promise<void>((resolve) => {
                mugImage.onload = () => {
                    URL.revokeObjectURL(dataUrl);
                    resolve();
                };
                mugImage.src = dataUrl;
            });

            if (!isMounted) return; // Проверка, что компонент еще смонтирован

            const updateDimensions = (): void => {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            updateDimensions();
            window.addEventListener('resize', updateDimensions);

            // Создаем частицы
            const particles: MugParticle[] = [];
            const particleCount: number = 20;

            const initParticles = (): void => {
                for (let i = 0; i < particleCount; i++) {
                    particles.push(
                        new MugParticle(window.innerWidth, window.innerHeight),
                    );
                }
            };
            initParticles();

            // Анимация
            const animate = (): void => {
                if (!isMounted) return; // Останавливаем анимацию если компонент размонтирован

                ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

                particles.forEach((particle) => {
                    particle.update(window.innerWidth, window.innerHeight);
                    particle.draw(ctx, mugImage);
                });

                animationRef.current = requestAnimationFrame(animate);
            };

            animate();

            // Возвращаем cleanup функцию для window listener
            return () => {
                window.removeEventListener('resize', updateDimensions);
            };
        };

        initAnimation();

        // Cleanup функция
        return () => {
            isMounted = false;
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    // Обновляем размеры canvas при изменении окна
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = dimensions.width;
            canvas.height = dimensions.height;
        }
    }, [dimensions]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    );
};
