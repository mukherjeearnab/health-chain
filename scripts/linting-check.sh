ROOT_DIR=$PWD

L1_DIR='/l1-data-layer'
L2_DIR='/l2-function-layer'

LINT_DIR='/local'

echo "linting $LINT_DIR $L1_DIR"
cd $ROOT_DIR$LINT_DIR$L1_DIR
npm run lint

echo "linting $LINT_DIR $L2_DIR"
cd $ROOT_DIR$LINT_DIR$L2_DIR
npm run lint

LINT_DIR='/state'

echo "linting $LINT_DIR $L1_DIR"
cd $ROOT_DIR$LINT_DIR$L1_DIR
npm run lint

echo "linting $LINT_DIR $L2_DIR"
cd $ROOT_DIR$LINT_DIR$L2_DIR
npm run lint
