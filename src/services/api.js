const API_URL = 'http://localhost:3000/api';

export const contractService = {
    async saveContract(data) {
        try {
            const response = await fetch(`${API_URL}/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao salvar contrato', error);
            throw error;
        }
    }
};

