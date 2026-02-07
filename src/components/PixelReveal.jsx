import { motion } from 'framer-motion';

export default function PixelReveal({ onFinished }) {
    // Define grid dimensions
    const columns = 20;
    const rows = 12;
    const totalBlocks = columns * rows;

    // Animation variants for the blocks
    const blockVariants = {
        initial: { opacity: 1 },
        reveal: (i) => ({
            opacity: 0,
            transition: {
                duration: 0.4,
                // Staggered delay based on random-ish pattern or simple order
                delay: (i % columns) * 0.05 + Math.floor(i / columns) * 0.05 + Math.random() * 0.2,
                ease: "easeInOut"
            }
        })
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 6000,
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                pointerEvents: 'none'
            }}
        >
            {[...Array(totalBlocks)].map((_, i) => (
                <motion.div
                    key={i}
                    custom={i}
                    variants={blockVariants}
                    initial="initial"
                    animate="reveal"
                    onAnimationComplete={() => {
                        // Only trigger onFinished once, for the last potential block
                        if (i === totalBlocks - 1) {
                            setTimeout(onFinished, 500);
                        }
                    }}
                    style={{
                        background: '#080808', // Match the main background color
                        width: '101%', // Slight overlap to prevent gaps
                        height: '101%'
                    }}
                />
            ))}
        </div>
    );
}
