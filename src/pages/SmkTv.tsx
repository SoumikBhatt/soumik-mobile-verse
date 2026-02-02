import { useEffect } from 'react';

const SmkTv = () => {
    useEffect(() => {
        // Set document title
        document.title = "SMK TV | Mobile Verse";
        return () => {
            document.title = "Soumik's Mobile Verse";
        };
    }, []);

    return (
        <div className="w-full h-screen bg-black">
            <iframe
                src="/smk-tv/index.html"
                title="SMK TV"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default SmkTv;
