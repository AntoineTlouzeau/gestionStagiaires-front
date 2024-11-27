const SORT_DIRECTION_ASC = 'asc';
const SORT_DIRECTION_DESC = 'desc';

function SortingIcon({ sortingDirection }) {
    return (
        <span className="cursor-pointer">
            {sortingDirection === SORT_DIRECTION_ASC ? '⭳' : '⭱'}
        </span>
    );
};

export default SortingIcon