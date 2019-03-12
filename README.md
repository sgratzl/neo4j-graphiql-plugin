Neo4j GraphiQL Plugin for Neo4j
======================================================
[![License][mit-image]][mit-url] [![CircleCI][ci-image]][ci-url] [![CircleCI][ci-image-dev]][ci-url-dev] <sup>(dev)</sup>

This is a plugin for the [Neo4j graph database](http://neo4j.com/) (v3.5) that provides the [GraphiQL](https://github.com/graphql/graphiql) web application via `<neo4jurl>/graphiql/` url.

Requirements
 * Neo4j
 * Neo4j GraphQL Plugin (https://github.com/neo4j-graphql/neo4j-graphql)


Installation
------------

1. Download the https://github.com/sgratzl/neo4j-graphiql-plugin/releases for your version.
2. Copy the _jar-file_ into Neo4j's `plugins` directory
3. Edit the Neo4j settings (`$NEO4J_HOME/conf/neo4j.conf`) to add:
  ```
dbms.unmanaged_extension_classes=org.neo4j.graphql=/graphql,com.sgratzl.neo4j.graphiql.plugin=/graphiql
```
4. (Re)start your Neo4j server

NOTE: _Neo4j Desktop_: the configuration is available under *Manage -> Settings*, the `plugins` folder via *Open Folder*.

Building
--------

```bash
git clone https://github.com/sgratzl/neo4j-graphiql-plugin.git
cd neo4j-graphiql-plugin
git checkout {branch}
mvn clean package
cp target/neo4j-graphiql-plugin-*.jar $NEO4J_HOME/plugins
echo 'dbms.unmanaged_extension_classes=org.neo4j.graphql=/graphql,com.sgratzl.neo4j.graphiql.plugin=/graphiql' >> $NEO4J_HOME/conf/neo4j.conf
$NEO4J_HOME/bin/neo4j restart
```

Testing
-------

```
mvn test
```
 

[mit-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[mit-url]: https://opensource.org/licenses/MIT
[ci-image]: https://circleci.com/gh/sgratzl/neo4j-graphiql-plugin.svg?style=shield
[ci-url]: https://circleci.com/gh/sgratzl/neo4j-graphiql-plugin
[ci-image-dev]: https://circleci.com/gh/sgratzl/neo4j-graphiql-plugin/tree/develop.svg?style=shield
[ci-url-dev]: https://circleci.com/gh/sgratzl/neo4j-graphiql-plugin/tree/develop
