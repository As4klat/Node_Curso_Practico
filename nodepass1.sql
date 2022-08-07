CREATE TABLE [dbo].[Clientes](
	[id] [int] NOT NULL IDENTITY(1,1),
	[Nombre] [varchar](50) NOT NULL,
	[Apellido] [varchar](50) NOT NULL,
	[Edad] [smallint] NOT NULL
CONSTRAINT [PK_Clientes] PRIMARY KEY CLUSTERED
([id] ASC)) ON [PRIMARY]

CREATE TABLE [dbo].[ClientesTelefonos](
	[id] [int] NOT NULL IDENTITY(1,1),
	[idCliente] [int] NOT NULL,
	[telefono] [varchar](50) NOT NULL
CONSTRAINT [PK_ClientesTelefonos] PRIMARY KEY CLUSTERED
([id] ASC)) ON [PRIMARY]

ALTER TABLE [dbo].[ClientesTelefonos] WITH CHECK ADD CONSTRAINT [FK_ClientesTelefonos_Clientes] FOREIGN KEY(idCliente) REFERENCES [dbo].[Clientes] ([id])