export const PlacementArray = [
    'top-start', 'top', 'top-end',
    'right-start', 'right', 'right-end',
    'bottom-start', 'bottom', 'bottom-end',
    'left-start', 'left', 'left-end'
];

export const isValidPlacement = value => PlacementArray.includes(value);
