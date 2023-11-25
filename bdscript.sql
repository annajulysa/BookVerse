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
	Constraint FK_LivroUser_user foreign key (idUser) 
	references User(idUser),
	Constraint FK_LivroUser_livro foreign key (idLivro)
	references Livro(idLivro)
);