import React, { useState, useEffect } from 'react';

interface WeatherData {
    temperature: number;
    weathercode: number;
    city: string;
}

const WeatherWidget: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    // Weather codes mapping to FontAwesome icons
    const getWeatherIcon = (code: number) => {
        if (code === 0) return 'fa-sun'; // Clear sky
        if (code >= 1 && code <= 3) return 'fa-cloud-sun'; // Partly cloudy
        if (code >= 45 && code <= 48) return 'fa-smog'; // Fog
        if (code >= 51 && code <= 67) return 'fa-cloud-rain'; // Drizzle/Rain
        if (code >= 71 && code <= 77) return 'fa-snowflake'; // Snow
        if (code >= 80 && code <= 82) return 'fa-cloud-showers-heavy'; // Showers
        if (code >= 95 && code <= 99) return 'fa-bolt'; // Thunderstorm
        return 'fa-cloud';
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // 1. Get Location (IP-based)
                const locationRes = await fetch('https://ipapi.co/json/');
                const locationData = await locationRes.json();

                if (!locationData.latitude || !locationData.longitude) {
                    throw new Error("Location not found");
                }

                // 2. Get Weather (Open-Meteo)
                const weatherRes = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${locationData.latitude}&longitude=${locationData.longitude}&current_weather=true`
                );
                const weatherData = await weatherRes.json();

                setWeather({
                    temperature: weatherData.current_weather.temperature,
                    weathercode: weatherData.current_weather.weathercode,
                    city: locationData.city || "Unknown City"
                });
            } catch (error) {
                console.error("Failed to fetch weather:", error);
                // Fallback
                setWeather({ temperature: 0, weathercode: 0, city: "Linux Terminal" });
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) return <span className="animate-pulse">Loading weather...</span>;
    if (!weather) return null;

    return (
        <div className="flex items-center gap-2 font-mono text-xs md:text-sm text-accent cursor-default" title={`Current weather in ${weather.city}`}>
            <i className={`fas ${getWeatherIcon(weather.weathercode)}`}></i>
            <span>{weather.temperature}°C</span>
            <span className="opacity-50 mx-1">|</span>
            <span>{weather.city}</span>
        </div>
    );
};

export default WeatherWidget;
