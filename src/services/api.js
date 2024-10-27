import { notification } from "../utils/notifications.js";
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

            if (response.ok) {
                const result = await response.json();
                notification("Contrato salvo com sucesso!", "#22c55e", 3000)
            } else {
                if (response.status === 500) {
                    notification("Erro interno do servidor. O contrato não foi salvo.", "#ef4444", 3000);
                } else if (response.status === 400) {
                    notification("Dados inválidos fornecidos. Verifique e tente novamente.", "#FFC107", 3000);
                } else {
                    notification("Erro ao salvar o contrato. Tente novamente mais tarde.", "#ef4444", 3000);
                }        
            }
        } catch (error) {
            notification("Falha na conexão com o servidor. Verifique sua conexão e tente novamente.", "#ef4444", 3000);
            throw error;
        }
    }
};

