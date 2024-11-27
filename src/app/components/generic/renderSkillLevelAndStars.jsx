export const renderSkillLevelAndStars = (numStars) => {
    const skillLevel = (numStars) => {
        switch (numStars) {
            case 1:
                return { label: 'Débutant', className: 'pill-red' };
            case 2:
                return { label: 'Intermédiaire', className: 'pill-yellow' };
            case 3:
                return { label: 'Expert', className: 'pill-green' };
            default:
                return { label: 'N/A', className: '' };
        }
    };
    const fullStars = numStars;
    const emptyStars = 3 - numStars;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={i} className="text-5xl text-yellow-400">&#9733;</span>);
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<span key={i + fullStars} className="text-5xl text-gray-400 dark:text-background-darker">&#9733;</span>);
    }
    return (
        <span>
            {stars}
            <span className={`my-2 text-gray-500 dark:text-background ${skillLevel(numStars).className}`}>
                {skillLevel(numStars).label}
            </span>
        </span>
    );
};
