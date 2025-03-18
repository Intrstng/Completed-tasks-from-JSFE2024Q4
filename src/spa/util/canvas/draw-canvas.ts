export function drawCanvas(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');

    if (ctx) {
        // Circle
        const diameter = 500;
        const radius = diameter / 2;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00acc1';
        ctx.fill();
        ctx.closePath();

        // Font
        ctx.fillStyle = '#000';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Your input data is correct,', centerX, centerY - 90);
        ctx.fillText('but the canvas wheel is not implemented yet', centerX, centerY - 45);
        ctx.fillText('(tag <canvas> added in HTML).', centerX, centerY);
        ctx.fillText('The wheel will be implemented soon.', centerX, centerY + 45);
    }
}
