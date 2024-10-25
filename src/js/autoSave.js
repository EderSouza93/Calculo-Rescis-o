export const autoSave = (data) => {
    fetch('http://localhost:3000/api/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
    })
    .then((response) => {
        console.log('Resposta bruta:', response);
        return response.json()
    })
    .then((result) => {
        console.log('Auto-save bem-sucedido', result);
    })
    .catch((error) => {
        console.error('Error no auto-save:', error);
    });
}