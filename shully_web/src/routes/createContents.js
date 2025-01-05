import React, { useState } from 'react';
// import './NewPageEditor.css';

const PAGE_HEIGHT = 1122; // A4 용지 높이 (픽셀 기준, 96 DPI로 설정)

export default function NewPageEditor(){
    const [content, setContent] = useState('');

    const getPagedContent = () => {
        const lines = content.split('\n');
        let pages = [];
        let currentPage = '';
        let currentHeight = 0;

        lines.forEach(line => {
            const lineHeight = 20; // 예상 라인 높이 (픽셀)
            if (currentHeight + lineHeight > PAGE_HEIGHT) {
                pages.push(currentPage);
                currentPage = '';
                currentHeight = 0;
            }
            currentPage += line + '\n';
            currentHeight += lineHeight;
        });

        if (currentPage.trim()) {
            pages.push(currentPage);
        }

        return pages;
    };

    const handleSave = () => {
        if (content.trim() === '') {
            alert('내용이 비어 있습니다. 내용을 입력해 주세요.');
            return;
        }
        const pages = getPagedContent();
        console.log('저장된 내용 (페이지):', pages);
        alert(`내용이 저장되었습니다! 총 ${pages.length}페이지.`);
    };

    return (
        <div className="container">
            <h1>새 페이지 추가</h1>
            <p>아래에 내용을 입력한 후 저장 버튼을 클릭하세요. A4 용지 기준으로 페이징됩니다.</p>
            <textarea
                id="contentEditor"
                placeholder="여기에 텍스트를 입력하세요..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button className="save-button" onClick={handleSave}>저장</button>
            <div className="page-preview">
                {getPagedContent().map((page, index) => (
                    <div key={index} className="page">
                        <h2>페이지 {index + 1}</h2>
                        <pre>{page}</pre>
                    </div>
                ))}
            </div>
        </div>
    );
};

