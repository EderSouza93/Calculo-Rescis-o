export const autoSave = (data) => {
    fetch('/save-progress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((result) => {
        console.log('Auto-save bem-sucedido', result);
    })
    .catch((error) => {
        console.error('Error no auto-save:', error);
    });
}