CREATE TABLE "evaluaciones" (
                                "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                "image" varchar,
                                "id_evaluador" int
);

CREATE TABLE "areas" (
                         "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                         "start_x" int,
                         "start_y" int,
                         "end_x" int,
                         "end_y" int,
                         "height" double precision,
                         "width" double precision,
                         "radio" double precision,
                         "type" varchar,
                         "type_area" varchar,
                         "id_evaluacion" int
);

CREATE TABLE "propetarios" (
                               "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                               "name" varchar
);

CREATE TABLE "evaluadores" (
                               "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                               "name" varchar
);

CREATE TABLE "terrenos" (
                            "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                            "id_propietario" int,
                            "id_evaluacion" int
);

ALTER TABLE "areas" ADD FOREIGN KEY ("id_evaluacion") REFERENCES "evaluaciones" ("id");

ALTER TABLE "evaluaciones" ADD FOREIGN KEY ("id_evaluador") REFERENCES "evaluadores" ("id");

ALTER TABLE "terrenos" ADD FOREIGN KEY ("id_propietario") REFERENCES "propetarios" ("id");

ALTER TABLE "terrenos" ADD FOREIGN KEY ("id_evaluacion") REFERENCES "evaluaciones" ("id");


INSERT INTO evaluadores(name) values ('John Doe');
INSERT INTO evaluaciones(image, id_evaluador) values ('https://dummyimage.com/600.png',1);
INSERT INTO areas(start_x, start_y, end_x, end_y, height, width, radio, type, type_area, id_evaluacion)
values (100, 100, 300,300, 150, 200, null, 'Rectangle', 'evaluated',1), (120, 120, 250,250, null, null, 100, 'Circle', 'native_forest',1);
