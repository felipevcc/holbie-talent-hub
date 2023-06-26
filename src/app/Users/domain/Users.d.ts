export interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    company_id: number;
    professional_id: number;
};
