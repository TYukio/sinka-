USE sinka;

# Tipos de usuário
INSERT INTO `persontype` (`title`, `mui_icon`) VALUES ('Atleta', 'directions_run');
INSERT INTO `persontype` (`title`, `mui_icon`) VALUES ('Personal Trainer', 'sports_kabaddi');
INSERT INTO `persontype` (`title`, `mui_icon`) VALUES ('Coach', 'sports');
INSERT INTO `persontype` (`title`, `mui_icon`) VALUES ('SinkaAdmin', 'person');

# Esportes
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Vôlei', 'sports_volleyball');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Futebol', 'sports_soccer');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Tênis', 'sports_tennis');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Handebol', 'sports_handball');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Basquete', 'sports_basketball');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Artes marciais', 'sports_martial_arts');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('MMA', 'sports_mma');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Golf', 'sports_golf');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Natação', 'pool');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Ciclismo', 'directions_bike');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Fisioculturismo', 'fitness_center');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Canoagem', 'kayaking');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Skate', 'skateboarding');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('DeathNote', 'book');

# Usuários fictícios, todas as senhas são '123'
INSERT INTO `person` (`email`, `pass`, `creation`, `gender`, `birth`, `full_name`, `biography`) VALUES (
	'tadalafellas@fellas.com', 
	'$2a$04$NNMRRIeaD..X2DoYtiTJP.M4VAa0KsBMpTK9ehV7WWNoSEb7cAKw.',
    '2012-06-12',
    'm',
    '1985-01-02',
    'Fabio Marques',
    'A cada segundo, o sangue passa pelos nossos tecidos, promovendo milhares de reações e eventos bioquímicos, como a oxigenação, a regeneração celular, desintoxicação de resíduos metabólicos, entre uma infinidade de outras reações.'
);

INSERT INTO `person` (`email`, `pass`, `creation`, `gender`, `birth`, `full_name`, `biography`) VALUES (
	'toguro@mansaomaromba.com', 
	'$2a$04$NNMRRIeaD..X2DoYtiTJP.M4VAa0KsBMpTK9ehV7WWNoSEb7cAKw.',
    '2016-07-02',
    'm',
    '1993-05-12',
    'Tiago Toguro',
    'eu sou o toguro'
);

# Atribuições de tipo de usuário
INSERT INTO `person_persontype` (`id_person`, `id_persontype`) VALUES (1, 1);
INSERT INTO `person_persontype` (`id_person`, `id_persontype`) VALUES (2, 2);
INSERT INTO `person_persontype` (`id_person`, `id_persontype`) VALUES (2, 3);

# Atribuições de esporte
INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (1, 1);
INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (1, 6);
INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (2, 2);
INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (2, 3);
INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (2, 7);
