/**
 * @author KylesLight
 * @date 10/05/2018-5:09 PM
 * @file image
 */

export const getBase64 = (file) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
};
