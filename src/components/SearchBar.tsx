
import type { ChangeEvent } from "react";

type SearchBarProps = {
	searchTerm: string;
	onSearchChange: (searchTerm: string) => void;
};

const SearchBar = ({
	searchTerm,
	onSearchChange,
}: SearchBarProps) => {
	const handleSearchChange = (
		event: ChangeEvent<HTMLInputElement>,
	): void => {
		onSearchChange(event.target.value);
	};

	return (
		<div className="search-container">
			<label htmlFor="search">Search films:</label>

			<input
				id="search"
				type="text"
				placeholder="Enter a film title..."
				value={searchTerm}
				onChange={handleSearchChange}
			/>
		</div>
	);
};

export default SearchBar;