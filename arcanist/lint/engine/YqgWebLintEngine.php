<?php

class YqgWebLintEngine extends ArcanistLintEngine {
  /** @Override */
  public function buildLinters() {
    $root = $this -> getWorkingCopy() -> getProjectRoot();
    $console = PhutilConsole :: getConsole();

    $future = new ExecFuture("npm run lint && npm test");
    $future -> setCWD($root . "/");
    list($exitcode, $stdout, $stderr) = $future->resolve();
    $console->writeOut($stdout);
    $console->writeOut("\n");
    $console->writeOut($stderr);
    $console->writeOut("\n");

    if ($exitcode != 0) {
      $console -> writeOut("All code in any code-base should look like a single person typed it, no matter how many people contributed. --idiomatic.js\n");
      $console -> writeOut("无论有多少人在维护，所有在代码仓库中的代码理应看起来像同一个人写的。 --idiomatic.js\n");
      $console -> writeOut("https://github.com/rwaldron/idiomatic.js/tree/master/translations/zh_CN\n");
      throw new Exception("Keep it in mind!");
    } else {
      $console -> writeOut("All code are clean, you did a great job!\n");
    }
    return;
  }
}
