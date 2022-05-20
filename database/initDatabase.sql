DROP database IF EXISTS `real_world_tdd`;
CREATE database `real_world_tdd`;
USE `real_world_tdd`;

CREATE TABLE IF NOT EXISTS real_world_tdd.votes (
    `name` VARCHAR(256),
    votes INT,
    PRIMARY KEY (lang_id)
);
