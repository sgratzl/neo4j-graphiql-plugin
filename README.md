Neo4j GraphiQL Plugin for Neo4j
======================================================
[![License][mit-image]][mit-url] [![CircleCI][ci-image]][ci-url] [![CircleCI][ci-image-dev]][ci-url-dev] <sup>(dev)</sup>

This is a plugin for the [Neo4j graph database](http://neo4j.com/) (v3.5) that provides the [GraphiQL](https://github.com/graphql/graphiql) web application via `<neo4jurl>/graphiql/` url.

Installation
------------

```
git clone https://github.com/sgratzl/neo4j-graphiql-plugin.git
cd neo4j-graphiql-plugin
```

Testing
-------

```
mvn test
```

Building
--------

```
mvn package
```

Eclipse import
--------------
Just import as Maven Project.

Setup in Neo4j
--------------
 1. Compile the project into a .jar file (in Eclipse right-click on project folder -> Run As -> Maven Install)
 2. Put the generated .jar file into the `/plugins` folder of the Neo4j installation
 3. TODO
 

[mit-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[mit-url]: https://opensource.org/licenses/MIT
[ci-image]: https://circleci.com/gh/sgratzl/neo4j-graphiql-plugin.svg?branch=master
[ci-url]: https://circleci.com/gh/sgratzl/neo4j-graphiql-plugin
[ci-image-dev]: https://circleci.com/gh/sgratzl/neo4j-graphiql-plugin.svg?branch=develop
[ci-url-dev]: https://circleci.com/gh/sgratzl/neo4j-graphiql-plugin
