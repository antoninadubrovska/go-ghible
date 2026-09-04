import type { View } from "../data/types.ts";

type ViewNavigationProps = {
	currentView: View;
	onViewChange: (view: View) => void;
};

const ViewNavigation = ({ currentView, onViewChange }: ViewNavigationProps) => {
	return (
		<nav className="view-navigation">

			<button
				className={`view-navigation-button ${
					currentView === "all" ? "active" : ""
				}`}
				onClick={() => onViewChange("all")}
			>
				All Films
			</button>

			<button
				className={`view-navigation-button ${
					currentView === "favorites" ? "active" : ""
				}`}
				onClick={() => onViewChange("favorites")}
			>
				Favorites
			</button>
		</nav>
	);
};

export default ViewNavigation;
