Drop database IF EXISTS bookverse_202200746 ;

create database IF NOT EXISTS bookverse_202200746 ;

use bookverse_202200746;

create table Genero(
	idGenero int auto_increment Primary key,
	designacao varchar(50)
);

create table Livro(
	idLivro int auto_increment primary key,
	titulo varchar(100) not null,
	obra varchar(500),
	personagem varchar(300),
	pagina int,
	autor varchar(100) not null,
	genero int,
    imagem varchar(300),
	CONSTRAINT FK_livroGenero FOREIGN KEY (genero)
		REFERENCES Genero(idGenero)
);

create table User(
	idUser int auto_increment Primary key,
	username varchar(50) not null,
	email varchar(150) not null,
	pass varchar(100) not null
);
  
create table Livro_User(
	idLivroUser int auto_increment Primary key,
	idLivro int not null,
	idUser int not null,
    dataAdicionado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	Constraint FK_LivroUser_user foreign key (idUser) 
	references User(idUser) ON DELETE CASCADE,
	Constraint FK_LivroUser_livro foreign key (idLivro)
	references Livro(idLivro)
);

Select * from user;
SELECT * FROM user WHERE email='pedro@gmail.com' and pass='p123';
DELETE FROM User WHERE idUser=1;
SELECT * FROM genero;

SELECT * FROM livro;
SELECT l.*, g.designacao as 'livroGenero' FROM livro l inner join genero g on l.genero = idGenero;
SELECT l.idLivro, l.titulo, l.autor, g.designacao as 'livroGenero' FROM livro l inner join genero g on l.genero = idGenero;
SELECT l.*, g.designacao as 'livroGenero' FROM livro l inner join genero g on l.genero = idGenero WHERE idLivro='1';
SELECT U.idUser, U.username, U.email, LU.idLivro, L.titulo, L.autor, G.designacao as 'livroGenero' FROM Livro_User LU JOIN User U ON LU.idUser = U.idUser JOIN Livro L ON LU.idLivro = L.idLivro JOIN Genero G ON L.genero = G.idGenero where u.iduser = 1;
SELECT Livro.titulo AS 'livro', COUNT(Livro_User.idLivroUser) AS 'totalAdicionados' FROM Livro JOIN Livro_User ON Livro.idLivro = Livro_User.idLivro GROUP BY Livro.idLivro, Livro.titulo ORDER BY totalAdicionados DESC;


SELECT * FROM Livro_User where idUser=3;
DELETE FROM Livro_User WHERE idUser =3;

SELECT L.idLivro, LU.idUser, L.titulo, L.autor, G.designacao AS livroGenero, L.imagem, LU.dataAdicionado FROM  Livro L
JOIN Livro_User LU ON L.idLivro = LU.idLivro
JOIN Genero G ON L.genero = G.idGenero
WHERE LU.idUser = 3
order by LU.dataAdicionado;