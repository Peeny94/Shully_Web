import React, { useState, useEffect } from "react";
import { ProfilePhoto, ProfileVideo, ProfileMediaContainer , SlideWrapper, SlideItem, SlideButton } from "./auth-Components";

export default function SliderComponent({ items, interval = 5000 }) {
    const [index, setIndex] = useState(0);

    // 자동 슬라이드 전환
    useEffect(() => {
        const timer = setInterval(() => {
            moveNext();
        }, interval);

        return () => clearInterval(timer);
    }, [index]);

    // 다음 슬라이드
    const moveNext = () => {
        setIndex((prev) => (prev + 1) % items.length);
    };

    // 이전 슬라이드
    const movePrev = () => {
        setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    return (
        <ProfileMediaContainer >
            <SlideWrapper currentSlide={index}>
                {items.map((item, i) => (
                    <SlideItem key={i}>
                        {item.type === "image" && <ProfilePhoto src={item.src} alt={`media-slider-${i}`} />}
                        {item.type === "video" && (
                            <ProfileVideo controls>
                                <source src={item.src} type="video/mp4" />
                                Your browser does not support the video tag.
                            </ProfileVideo>
                        )}
                        {item.type === "text" && <p>{item.content}</p>}
                    </SlideItem>
                ))}
            </SlideWrapper>

            <SlideButton direction="left" onClick={movePrev}>
                &#10094;
            </SlideButton>
            <SlideButton direction="right" onClick={moveNext}>
                &#10095;
            </SlideButton>
        </ProfileMediaContainer >
    );
}
