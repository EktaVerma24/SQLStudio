const DIFFICULTY_CONFIG = {
    easy: { label: "Easy", mod: "easy" },
    medium: { label: "Medium", mod: "medium" },
    hard: { label: "Hard", mod: "hard" },
};

function BadgeLevel({ level }) {
    const key = (level || "").toLowerCase();
    const config = DIFFICULTY_CONFIG[key] || { label: level || "Unknown", mod: "default" };

    return (
        <span className={`badge badge--${config.mod}`}>
            {config.label}
        </span>
    );
}

export default BadgeLevel;
