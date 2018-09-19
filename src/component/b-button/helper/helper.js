export const TypeArray = ['button', 'reset', 'submit'];

export const ShapeArray = ['round', 'icon', 'link', 'simple'];

export const SizeArray = ['sm', 'md', 'lg'];

export const isValidType = value => TypeArray.includes(value);

export const isValidShape = value => ShapeArray.includes(value);

export const isValidSize = value => SizeArray.includes(value);
