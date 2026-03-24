// イベント発生時にだけ必要なモジュールは動的に読み込む
// フロントエンドの初期描画を速くすることができる
import('./calc.mjs').then((module) => {
  console.log(module.add(10, 20));
  console.log(module.sub(15, 7));
  console.log(module.mul(9, 9));
});