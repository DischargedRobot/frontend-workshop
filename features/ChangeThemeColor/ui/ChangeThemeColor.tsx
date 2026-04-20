import React, { useMemo, useState, useRef, useEffect } from "react";
import "./ChangeThemeColor.scss";

type ColorKey = "main" | "secondary" | "text" | "textActive" | "background";

type ColorState = Record<ColorKey, string>;

const BLOCKS: { key: ColorKey; label: string }[] = [
    { key: "main", label: "основной" },
    { key: "secondary", label: "дополнительный" },
    { key: "text", label: "текст" },
    { key: "textActive", label: "дополнительный текст" },
    { key: "background", label: "фон" },
];

export const ColorBlocksPicker = () => {
    const [selectedBlock, setSelectedBlock] = useState<ColorKey | null>("main");
    const [colors, setColors] = useState<ColorState>({
        main: "#76af8f",
        secondary: "#3e81e7",
        text: "#363636",
        textActive: "#e3e3e3",
        background: "#ededed",
    });

    const containerRef = useRef<HTMLDivElement | null>(null);

    const selectedColor = useMemo(
        () => (selectedBlock ? colors[selectedBlock] : ""),
        [colors, selectedBlock]
    );

    const handleColorChange = (newColor: string) => {
        if (!selectedBlock) return;
        setColors((prev) => ({
            ...prev,
            [selectedBlock]: newColor,
        }));
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setSelectedBlock(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="color-picker">
            <h2 className="color-picker__title title title_litle">Палитра темы</h2>
            <div className="color-picker__blocks-row" ref={containerRef}>
                {BLOCKS.map(({ key, label }) => {
                    const isSelected = selectedBlock === key;
                    const color = colors[key];

                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setSelectedBlock(key)}
                            className={`color-picker__block ${isSelected ? "color-picker__block_selected" : ""}`}
                            style={{ backgroundColor: color }}
                        >
                            <span className="color-picker__block-label text text_very-litle">{label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="color-picker__picker-section">
                <div className="color-picker__info text">
                    Выбран блок: <b>{selectedBlock ?? "-"}</b>
                </div>

                <div className="color-picker__controls">
                    <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="color-picker__color-input text text_big"
                        aria-label="Выбрать цвет"
                        disabled={selectedBlock === null}
                    />

                    <input
                        type="text"
                        value={selectedColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="color-picker__hex-input"
                        placeholder="#000000"
                        disabled={selectedBlock === null}
                    />
                </div>
            </div>
        </div>
    );
}
