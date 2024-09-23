CREATE TABLE confirmation (
    id BIGSERIAL PRIMARY KEY,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    need_bus_to_city BOOLEAN,
    need_bus_to_restaurant BOOLEAN,
    extra_information VARCHAR(512),
    must_have_song VARCHAR(128),
    UNIQUE (id)
);

CREATE TABLE confirmation_member (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(64),
    last_name VARCHAR(64),
    confirmation_id INT NOT NULL,
    UNIQUE (id)
);

CREATE TABLE session (
    sid VARCHAR(256) NOT NULL,
    sess VARCHAR(256) NOT NULL,
    expire TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (sid)
);

CREATE TABLE user_ (
    id BIGSERIAL PRIMARY KEY,
    salt VARCHAR(32) NOT NULL,
    username VARCHAR(32) NOT NULL,
    password VARCHAR(256) NOT NULL,
    first_name VARCHAR(64),
    last_name VARCHAR(64),
    UNIQUE (username)
);