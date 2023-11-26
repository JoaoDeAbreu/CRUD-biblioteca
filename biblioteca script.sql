create database biblioteca;

create table livros (id integer primary key AUTO_INCREMENT,
titulo varchar (100),
autor varchar(100),
genero varchar(50),
ISBN int);

select * from livros;
delete from livros where id=1;