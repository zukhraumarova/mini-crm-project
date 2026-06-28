CREATE TABLE chat_messages (

    id SERIAL PRIMARY KEY,

    deal_id INTEGER REFERENCES deals(id) ON DELETE SET NULL,

    contact_id INTEGER REFERENCES contacts(id) ON DELETE SET NULL,

    role VARCHAR(20) NOT NULL,

    message TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);