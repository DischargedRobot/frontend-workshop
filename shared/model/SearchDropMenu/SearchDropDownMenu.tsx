"use client"

import "./SearchDropDownMenu.scss"

import {
	useState,
	useRef,
	useEffect,
	useMemo,
	ChangeEvent,
	KeyboardEvent,
} from "react"

export interface DropdownOption<T, E extends keyof T = keyof T> {
	key?: T[E]
	value: T
	label: string
}

interface SearchableDropdownProps<T> {
	options: DropdownOption<T>[]
	defaultValue?: T
	value?: T
	onSelect: (value: T | null) => void
	placeholder?: string
	disabled?: boolean
	className?: string
}

export const SearchDropDownMenu = <T,>({
	options,
	defaultValue,
	onSelect,
	placeholder = "Выберите...",
	disabled = false,
	className = "",
}: SearchableDropdownProps<T>) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [selected, setSelected] = useState<T | null>(defaultValue ?? null)
	const [userInput, setUserInput] = useState<string>(() => {
		if (defaultValue === undefined) return ""
		const found = options.find((opt) => opt.value === defaultValue)
		return found ? found.label : ""
	})
	const containerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	// const searchTerm = isOpen ? userInput : userInput

	const filteredOptions = useMemo(
		() =>
			options.filter((option) =>
				option.label.toLowerCase().includes(userInput.toLowerCase()),
			),
		[options, userInput],
	)

	// провермяем, есть ли опция с таким именем
	const isUserInputValid = useMemo(() => {
		const found = options.find((opt) => opt.value === selected)
		return found
			? userInput.toLowerCase() === found.label.toLowerCase()
			: false
	}, [userInput, selected, options])

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setIsOpen(false)
				if (!isUserInputValid) {
					setUserInput("")
					onSelect(null)
				}
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () =>
			document.removeEventListener("mousedown", handleClickOutside)
	}, [isUserInputValid, onSelect])

	const handleSelect = (option: DropdownOption<T> | null): void => {
		onSelect(option?.value ?? null)
		setSelected(option?.value ?? null)
		setUserInput(option?.label ?? "")
		setIsOpen(false)
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setUserInput(e.target.value)
		setIsOpen(true)
	}

	const handleInputClick = (): void => {
		setIsOpen(true)
		inputRef.current?.select()
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === "Escape") {
			setIsOpen(false)
			setUserInput("")
			onSelect(null)
			inputRef.current?.blur()
		}
		if (e.key === "Enter" && filteredOptions.length > 0 && isOpen) {
			e.preventDefault()
			handleSelect(
				e.currentTarget.value.length === 0 ? null : filteredOptions[0],
			)
		}
	}

	return (
		<div ref={containerRef} className={`search-dropdown ${className}`}>
			<input
				ref={inputRef}
				type="text"
				value={userInput}
				onChange={handleInputChange}
				onClick={handleInputClick}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				disabled={disabled}
				className="search-dropdown__input"
				autoComplete="off"
			/>

			<button
				type="button"
				onClick={(e) => {
					e.preventDefault()
					setIsOpen(!isOpen)
					inputRef.current?.focus()
				}}
				className="search-dropdown__arrow"
			>
				<svg
					className={`search-dropdown__arrow-icon ${isOpen ? "search-dropdown__arrow-icon_open" : ""}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>

			{isOpen && !disabled && (
				<div className="search-dropdown__dropdown">
					{filteredOptions.length === 0 ? (
						<ul className="search-dropdown__empty">
							Ничего не найдено
						</ul>
					) : (
						<ul className="search-dropdown__list">
							{filteredOptions.map((option, idx) => (
								<li
									key={option.key ? String(option.key) : `opt-${idx}`}
									onClick={() => handleSelect(option)}
									onMouseDown={(e) => e.preventDefault()}
									className={`search-dropdown__option ${option.value === selected ? "search-dropdown__option_selected" : ""}`}
								>
									{option.label}
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	)
}
