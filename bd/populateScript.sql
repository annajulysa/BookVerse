INSERT INTO user(username, email, pass) VALUES ('Teste', 'teste@gmail.com', 'teste');
INSERT INTO user(username, email, pass) VALUES ('Anna Almada', 'anna@gmail.com', 'anna');
INSERT INTO user(username, email, pass) VALUES ('Pedro Conceição', 'pedro@gmail.com', 'p123');
INSERT INTO user(username, email, pass) VALUES ('Diogo Oliveira', 'diogo@gmail.com', '123');
INSERT INTO user(username, email, pass) VALUES ('Sogia Marques', 'sofi@gmail.com', '456sofi');

INSERT INTO genero(designacao) VALUES ('Romance');
INSERT INTO genero(designacao) VALUES ('Humor');
INSERT INTO genero(designacao) VALUES ('Policial');
INSERT INTO genero(designacao) VALUES ('Triller');
INSERT INTO genero(designacao) VALUES ('Biografia');
INSERT INTO genero(designacao) VALUES ('Aventura');
INSERT INTO genero(designacao) VALUES ('Ação');
INSERT INTO genero(designacao) VALUES ('Drama');

INSERT INTO livro(titulo, obra, personagem, pagina, autor, genero, imagem) VALUES ('Arsène Lupin', 'Ladrão de Casaca reúne as 9 primeiras aventuras do notável ladrão. As narrativas envolvem roubos e fugas de Lupin que são bem espetaculares. Ninguém consegue deter o Ladrão de Casacas, apesar das tentativas de seu principal oponente, o Inspetor Ganimard. Arsène Lupin, gentleman-cambrioleur. O editor da revista encomendou a Maurice Leblanc uma novela policial, cujo herói fosse para a França o que era para a Inglaterra Sherlock Holmes e também criar uma rivalidade histórica.', 
																					'Um personagem fictício francês criado por Maurice Leblanc. Este ladrão cavalheiro é particularmente conhecido pelo seu talento em usar disfarces, inventar e assumir múltiplas identidades para cometer seus crimes criar quebra-cabeças criminais para cometer crimes perfeitos e enganar a polícia.', 
                                                                                    184, 'Maurice Leblanc', 3, 'Lupin.jpg');
INSERT INTO livro(titulo, obra, personagem, pagina, autor, genero, imagem) VALUES ('Isto Acaba Aqui', 'Lily tem 25 anos. Acaba de se mudar para Boston, pronta para começar uma nova vida e encontrar finalmente a felicidade. No terraço de um edifício, onde se refugia para pensar, conhece o homem dos seus sonhos: Ryle. Um neurocirurgião. Mas Ryle tem um segredo. Um passado que não conta a ninguém, nem mesmo a Lily. Existe dentro dele um turbilhão que faz Lily recordar-se do seu pai e das coisas que este fazia à sua mãe, mascaradas de amor, e sucedidas por pedidos de desculpa.',
																					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras scelerisque arcu neque, et interdum quam sagittis eget. Quisque id mattis nulla, nec finibus sapien. Mauris ultricies enim ut felis cursus, a sagittis purus pulvinar. Curabitur sodales elit at sodales eleifend. Curabitur et ante leo.',
																					336, 'Colleen Hoover', 1, 'romance.jpg');                                                                                    
INSERT INTO livro(titulo, obra, personagem, pagina, autor, genero, imagem) VALUES ('Batalha de Piadas Secas', 'Este não é um livro comum. São centenas e centenas de piadas, tanto clássicas como inéditas, para leres sozinho ou para jogares com os amigos, em quatro diferentes modos de batalha. Destaca as cartas no final do livro e usa-as para escolher uma piada, que tens de ler para derrotar os teus adversários. O teu objetivo é simples: fazê-los partir a rir!',
																					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras scelerisque arcu neque, et interdum quam sagittis eget. Quisque id mattis nulla, nec finibus sapien. Mauris ultricies enim ut felis cursus, a sagittis purus pulvinar. Curabitur sodales elit at sodales eleifend. Curabitur et ante leo.',
																					224, 'João Correia', 2, 'humor.jpg');                                                                                    
INSERT INTO livro(titulo, obra, personagem, pagina, autor, genero, imagem) VALUES ('Os Anagramas de Varsóvia', 'Polónia, ano de 1940. Os nazis isolam milhares de judeus num pequeno gueto em Varsóvia. Erik Cohen, um velho psiquiatra judeu, vê-se obrigado a partilhar um pequeno apartamento com a sobrinha e o adorado sobrinho-neto de nove anos, Adam. Certo dia, porém, Adam desaparece e o seu corpo, estranhamente mutilado, só é encontrado na manhã seguinte, no arame farpado sobre o muro que rodeia o gueto. Quando um segundo cadáver aparece em circunstâncias muito similares.',
																					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras scelerisque arcu neque, et interdum quam sagittis eget. Quisque id mattis nulla, nec finibus sapien. Mauris ultricies enim ut felis cursus, a sagittis purus pulvinar. Curabitur sodales elit at sodales eleifend. Curabitur et ante leo.',
																					300, 'Richard Zimler', 3, 'policial.jpg');                                                                                    
INSERT INTO livro(titulo, obra, personagem, pagina, autor, genero, imagem) VALUES ('Holly', 'Quando Penny Dahl lhe telefona na esperança de localizar a filha desaparecida, Holly Gibney, a nossa protagonista, parece relutante em aceitar um novo caso. Pete, o seu parceiro na agência de investigação privada, está com Covid. A sua mãe, com quem teve sempre uma relação complicada, acaba de morrer. E Holly devia estar a desfrutar de uns merecidos dias de descanso. Contudo, alguma coisa na voz desesperada de Penny faz com que lhe seja impossível recusar ajudar.',
																					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras scelerisque arcu neque, et interdum quam sagittis eget. Quisque id mattis nulla, nec finibus sapien. Mauris ultricies enim ut felis cursus, a sagittis purus pulvinar. Curabitur sodales elit at sodales eleifend. Curabitur et ante leo.',
																					464, 'Stephen King', 4, 'triller.jpg');
INSERT INTO livro(titulo, obra, personagem, pagina, autor, genero, imagem) VALUES ('Elon Musk', 'Quando Elon Musk era criança na África do Sul, ele era espancado regularmente por valentões. Um dia, um grupo o empurrou para baixo em alguns degraus de concreto e o chutou até que seu rosto se transformasse em uma bola de carne inchada. Ele ficou no hospital por uma semana. Mas as cicatrizes físicas foram menores em comparação com as emocionais infligidas por seu pai, um engenheiro, desonesto e fantasista carismático. O impacto de seu pai em sua psique perduraria.',
																					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras scelerisque arcu neque, et interdum quam sagittis eget. Quisque id mattis nulla, nec finibus sapien. Mauris ultricies enim ut felis cursus, a sagittis purus pulvinar. Curabitur sodales elit at sodales eleifend. Curabitur et ante leo.',
																					670, 'Walter Isaacson', 5, 'biografia.jpg');

INSERT INTO Livro_User(idLivro, idUser, dataAdicionado) VALUES (1, 1, NOW());
INSERT INTO Livro_User(idLivro, idUser, dataAdicionado) VALUES (2, 1, NOW());
INSERT INTO Livro_User(idLivro, idUser, dataAdicionado) VALUES (3, 1, NOW());
INSERT INTO Livro_User(idLivro, idUser, dataAdicionado) VALUES (2, 2, NOW());
INSERT INTO Livro_User(idLivro, idUser, dataAdicionado) VALUES (1, 2, NOW());
INSERT INTO Livro_User(idLivro, idUser, dataAdicionado) VALUES (4, 3, NOW());
INSERT INTO Livro_User(idLivro, idUser, dataAdicionado) VALUES (1, 3, NOW());
INSERT INTO Livro_User(idLivro, idUser, dataAdicionado) VALUES (6, 3, NOW());
INSERT INTO Livro_User(idLivro, idUser, dataAdicionado) VALUES (5, 4, NOW());
INSERT INTO Livro_User(idLivro, idUser, dataAdicionado) VALUES (2, 4, NOW());
INSERT INTO Livro_User(idLivro, idUser, dataAdicionado) VALUES (6, 5, NOW());
INSERT INTO Livro_User(idLivro, idUser, dataAdicionado) VALUES (2, 5, NOW());