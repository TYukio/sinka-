USE sinka;

# Tipos de usuário
INSERT INTO `persontype` (`title`, `mui_icon`) VALUES ('Atleta', 'directions_run');
INSERT INTO `persontype` (`title`, `mui_icon`) VALUES ('Personal Trainer', 'sports_kabaddi');
INSERT INTO `persontype` (`title`, `mui_icon`) VALUES ('Coach', 'sports');
INSERT INTO `persontype` (`title`, `mui_icon`) VALUES ('Organizador', 'badge');

# Esportes
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Vôlei', 'sports_volleyball');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Futebol', 'sports_soccer');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Tênis', 'sports_tennis');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Handebol', 'sports_handball');
INSERT INTO `sport` (`title`, `mui_icon`) VALUES ('Basquete', 'sports_basketball');

# Usuários fictícios, todas as senhas são '123'
INSERT INTO `person` (`email`, `pass`, `creation`, `gender`, `birth`, `full_name`, `biography`) VALUES 
(
	'tadalafellas@fellas.com', 
	'$2a$04$NNMRRIeaD..X2DoYtiTJP.M4VAa0KsBMpTK9ehV7WWNoSEb7cAKw.',
    '2012-06-12',
    'm',
    '1985-01-02',
    'Fabio Marques',
    'A cada segundo, o sangue passa pelos nossos tecidos, promovendo milhares de reações e eventos bioquímicos, como a oxigenação, a regeneração celular, desintoxicação de resíduos metabólicos, entre uma infinidade de outras reações.'
);

INSERT INTO `person` (`email`, `pass`, `creation`, `gender`, `birth`, `full_name`, `biography`) VALUES 
(
	'toguro@mansaomaromba.com', 
	'$2a$04$NNMRRIeaD..X2DoYtiTJP.M4VAa0KsBMpTK9ehV7WWNoSEb7cAKw.',
    '2016-07-02',
    'm',
    '1993-05-12',
    'Tiago Toguro',
    'eu sou o toguro'
);

INSERT INTO `person` (`email`, `pass`, `creation`, `gender`, `birth`, `full_name`, `biography`) VALUES 
(
	'mister@amnesia.com', 
	'$2a$04$NNMRRIeaD..X2DoYtiTJP.M4VAa0KsBMpTK9ehV7WWNoSEb7cAKw.',
    '2018-05-01',
    'o',
    '1990-11-12',
    'Mister Amnésia',
    'Esqueça tudo, esqueça tudo'
);


INSERT INTO `person` (`email`, `pass`, `creation`, `gender`, `birth`, `full_name`, `biography`) VALUES 
(
	'conga@laconga.com', 
	'$2a$04$NNMRRIeaD..X2DoYtiTJP.M4VAa0KsBMpTK9ehV7WWNoSEb7cAKw.',
    '2020-05-01',
    'f',
    '1987-05-12',
    'Conga LaConga',
    'Conga la conga, conga conga conga, la conga, conga conga conga.'
);

INSERT INTO `person` (`email`, `pass`, `creation`, `gender`, `birth`, `full_name`, `biography`) VALUES 
(
	'mickey@mouse.com', 
	'$2a$04$NNMRRIeaD..X2DoYtiTJP.M4VAa0KsBMpTK9ehV7WWNoSEb7cAKw.',
    '2018-05-17',
    'm',
    '1928-11-18',
    'Mickey Mouse',
    'Ao longo dos anos, Mickey foi sempre responsável por salvar as finanças da empresa e tem sabido adaptar-se visualmente aos novos tempos - os "retoques" operados no rato têm sido sempre bem aceites pelo público. Aliás, desde 1930, soube adaptar os seus hábitos, dando o mote para uma vida mais saudável ao deixar de beber e de fumar.'
);

INSERT INTO `person` (`email`, `pass`, `creation`, `gender`, `birth`, `full_name`, `biography`) VALUES 
(
	'lightyagami@yahoo.com', 
	'$2a$04$NNMRRIeaD..X2DoYtiTJP.M4VAa0KsBMpTK9ehV7WWNoSEb7cAKw.',
    '2019-03-20',
    'm',
    '1986-02-28',
    'Light Yagami',
    'Não importa o quanto tente, você sozinho não pode mudar o mundo. Mas este é o lado bonito do mundo.'
);

# Times
INSERT INTO `team` (`id_creator`, `id_sport`, `creation`, `title`, `gender`, `about`) VALUES
(
	1, 
    1,
    '2021-06-25',
	'MiBR',
    'm',
    'Time MIBR bom de mais, melhor time de todos, muito bom...'
);

INSERT INTO `team` (`id_creator`, `id_sport`, `creation`, `title`, `gender`, `about`) VALUES
(
	6, 
    5,
    '2021-06-25',
	'Seleção Brasileira',
    'o',
    'Time real da seleção brasileira unisex, patrocinado pela redbull e talz'
);

INSERT INTO `sportcourt` (`id_owner`, `id_sport`, `creation`, `title`, `subtitle`, `addressname`) VALUES
(
	5,
    2,
    '2022-04-30',
	'Quadra Teodoro',
	'Quadra de society',
    'Rua da maionese, 437'
);

INSERT INTO `sportcourt` (`id_owner`, `id_sport`, `creation`, `title`, `subtitle`, `addressname`) VALUES
(
	4,
    4,
    '2022-05-22',
	'Handebol de elite',
    'Quadra profissional de Handebol',
    'Rua Fernando Alonso, 1046'
);

# Atribuições de tipo de usuário
INSERT INTO `person_persontype` (`id_person`, `id_persontype`) VALUES (1, 1);
INSERT INTO `person_persontype` (`id_person`, `id_persontype`) VALUES (1, 2);

INSERT INTO `person_persontype` (`id_person`, `id_persontype`) VALUES (2, 2);
INSERT INTO `person_persontype` (`id_person`, `id_persontype`) VALUES (2, 3);

INSERT INTO `person_persontype` (`id_person`, `id_persontype`) VALUES (3, 1);

INSERT INTO `person_persontype` (`id_person`, `id_persontype`) VALUES (4, 1);
INSERT INTO `person_persontype` (`id_person`, `id_persontype`) VALUES (4, 2);
INSERT INTO `person_persontype` (`id_person`, `id_persontype`) VALUES (4, 4);

INSERT INTO `person_persontype` (`id_person`, `id_persontype`) VALUES (5, 4);

INSERT INTO `person_persontype` (`id_person`, `id_persontype`) VALUES (6, 3);
INSERT INTO `person_persontype` (`id_person`, `id_persontype`) VALUES (6, 2);

# Atribuições de esporte
INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (1, 1);
INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (1, 5);

INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (2, 2);
INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (2, 3);
INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (2, 4);

INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (3, 1);
INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (3, 5);
INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (3, 4);

INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (4, 2);

INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (5, 2);
INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (5, 4);

INSERT INTO `person_sport` (`id_person`, `id_sport`) VALUES (6, 3);

# Atribuições de time
INSERT INTO `person_team` (`id_person`, `id_team`, `joined`, `coach`) VALUES (1, 1, '2022-01-01', 0);
INSERT INTO `person_team` (`id_person`, `id_team`, `joined`, `coach`) VALUES (2, 1, '2022-01-02', 1);
INSERT INTO `person_team` (`id_person`, `id_team`, `joined`, `coach`) VALUES (3, 1, '2022-02-06', 0);

INSERT INTO `person_team` (`id_person`, `id_team`, `joined`, `coach`) VALUES (5, 2, '2022-03-02', 0);
INSERT INTO `person_team` (`id_person`, `id_team`, `joined`, `coach`) VALUES (6, 2, '2022-03-02', 0);