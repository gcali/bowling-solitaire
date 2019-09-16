// tslint:disable-next-line: no-var-requires
const tsConfig = require('./tsconfig.json');
// tslint:disable-next-line: no-var-requires
const tsConfigPaths = require('tsconfig-paths');

const paths = tsConfig.compilerOptions.paths;

const baseDir = 'src/';
const outDir = 'server-dist';

const mappedPaths =
    Object.keys(paths).reduce(
        (agg, key) => ({
            ...agg,
            [key]: paths[key].map((p) =>
                p.replace(baseDir, ''),
            ),
        }),
        {},
    );

tsConfigPaths.register({
    baseUrl: outDir,
    paths: mappedPaths,
});
