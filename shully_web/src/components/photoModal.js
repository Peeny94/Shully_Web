import React, { useState } from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const ModalContent = styled.div`
    position: relative;
    max-width: 600px; /* 최대 너비 */
    max-height: 600px; /* 최대 높이 */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    padding: 10px;
`;

const FullImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function PhotoWithModal({ src, alt }) {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <>
            {/* 기본 사진 */}
            <img
                src={src}
                alt={alt || "Image"}
                style={{ width: "100%", cursor: "pointer", borderRadius: "10px" }}
                onClick={openModal}
            />

            {/* Modal */}
            {isModalOpen && (
                <ModalBackdrop onClick={closeModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <FullImage src={src} alt={alt || "Image"} />
                        <CloseButton onClick={closeModal}>X</CloseButton>
                    </ModalContent>
                </ModalBackdrop>
            )}
        </>
    );
}
