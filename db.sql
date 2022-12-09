-- Database
CREATE DATABASE angkasa

-- Users
CREATE TABLE users (
    user_id UUID  PRIMARY KEY NOT NULL, 
    username VARCHAR(64) NOT NULL,
    email VARCHAR (64) NOT NULL UNIQUE,
    phone VARCHAR(16) NOT NULL UNIQUE,
    avatar VARCHAR,
    city VARCHAR(128),
    address VARCHAR,
    postcode VARCHAR(16),
    password VARCHAR(64) NOT NULL,
    ava_pub_id VARCHAR,
    ava_url VARCHAR,
    ava_secure_url VARCHAR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

INSERT INTO users (user_id, username, email, phone, city, address, postcode, password)
VALUES ('8b65d7af-91c2-478f-8655-ddaabeb3fa80', 'Brandon', 'brandon@mail.com', '08563344252537', 'Jakarta', 'Walet Street Number 100', '11800', 'password');

-- Admins
CREATE TABLE admins (
    admin_id UUID  PRIMARY KEY NOT NULL, 
    username VARCHAR(64) NOT NULL,
    email VARCHAR (64) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

-- Airlines
CREATE TABLE airlines (
    airline_id UUID PRIMARY KEY NOT NULL,
    name VARCHAR (256),
    logo VARCHAR,
    logo_pub_id VARCHAR,
    logo_url VARCHAR,
    logo_secure_url VARCHAR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

INSERT INTO airlines (airline_id, name)
VALUES ('cb321f1c-7f85-4b40-8f35-8829db0bc702', 'Garuda');


-- Flights
CREATE TABLE IF NOT EXISTS flights (
    flight_id UUID PRIMARY KEY NOT NULL,
    arrival_country VARCHAR(50) NOT NULL,
    arrival_city VARCHAR(50) NOT NULL,
    departure_country VARCHAR(50) NOT NULL,
    departure_city VARCHAR(50) NOT NULL,
    arrival_time INTEGER, -- 0 = 00:00 - 06:00 , 1 = 06:00 - 12:00 , 2 = 12:00 - 18:00 , 3 = 18:00 - 24:00
    departure_time INTEGER, -- 0 = 00:00 - 06:00 , 1 = 06:00 - 12:00 , 2 =  12:00 - 18:00 , 3 = 18:00 - 24:00
    price INTEGER NOT NULL,
    airline_id UUID REFERENCES airlines(airline_id),
    terminal VARCHAR NOT NULL,
    gate VARCHAR NOT NULL,
    transit INTEGER, -- 0 = direct, 1 = transit, 2 = transit2+ 
    facilities INTEGER, -- 0 = luggage, 1 = in-flight-meal, 2 = wifi
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

INSERT INTO flights (flight_id, arrival_country, arrival_city, departure_country, departure_city,
arrival_time, departure_time, price, airline_id, terminal, gate, transit, facilities)
VALUES ('cb321f1c-7f85-4b40-8f35-8829db0bc702', 'SGP', 'Singapore', 'IDN', 'Bali', 1, 
1, 1500000, 'cb321f1c-7f85-4b40-8f35-8829db0bc702', '1', 'A', 0, 2 );


-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
    booking_id UUID PRIMARY KEY NOT NULL,
    user_id UUID REFERENCES users(user_id),
    flight_id UUID REFERENCES flights(flight_id),
    airline_id UUID REFERENCES airlines(airline_id),
    psg_title VARCHAR(64) NOT NULL,
    psg_name VARCHAR (64) NOT NULL,
    psg_nationality VARCHAR(16) NOT NULL,
    travel_insurance BOOLEAN DEFAULT false,
    payment_status BOOLEAN DEFAULT false,
    total_payment INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);

INSERT INTO bookings (booking_id, user_id, flight_id, airline_id, psg_title, psg_name, psg_nationality, travel_insurance, payment_status,
total_payment) VALUES (
'db321f1c-7f85-4b40-8f35-8829db0bc701', -- booking id
'8b65d7af-91c2-478f-8655-ddaabeb3fa80', -- user_id
'cb321f1c-7f85-4b40-8f35-8829db0bc702', -- flight_id
'cb321f1c-7f85-4b40-8f35-8829db0bc702', -- airline_id
'Mr Brandon', 'Brandon Wijaya', 'Indonesia', true, true, 1650000
);