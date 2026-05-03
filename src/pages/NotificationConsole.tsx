import { useEffect } from 'react';

const NotificationConsole = () => {
    useEffect(() => {
        // Set document title
        document.title = "Notification Console | Mobile Verse";
        return () => {
            document.title = "Soumik's Mobile Verse";
        };
    }, []);

    return (
        <div className="w-full h-screen bg-black">
            <iframe
                src="/notification-console/index.html"
                title="Notification Console"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default NotificationConsole;
