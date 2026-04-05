import { useEffect } from "react";

const Bhakti365 = () => {
    useEffect(() => {
        // Set document title
        document.title = "Bhakti365 | Daily Hinduism";
        return () => {
            document.title = "Your daily spiritual companion";
        };
    }, []);

    return (
        <div className="w-full h-screen bg-black">
            <iframe
                src="/bhakti365/index.html"
                title="Bhakti365"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};


export default Bhakti365;