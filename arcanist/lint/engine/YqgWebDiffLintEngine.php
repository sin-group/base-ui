<?php

class YqgWebDiffLintEngine extends ArcanistLintEngine
{

  /** @Override */
  public function buildLinters()
  {
    // Filter the affected paths.
    $paths = $this->getPaths();
    foreach ($paths as $key => $path) {
      if (!$this->pathExists($path)) {
        // Don't lint removed files. In more complex linters it is sometimes
        // appropriate to lint removed files so you can raise a warning like
        // "you deleted X, but forgot to delete Y!", but most linters do not
        // operate correctly on removed files.
        unset($paths[$key]);
        continue;
      }

      $disk = $this->getFilePathOnDisk($path);
      if (is_dir($disk)) {
        // Don't lint directories. (In SVN, they can be directly modified by
        // changing properties on them, and may appear as modified paths.)
        unset($paths[$key]);
        continue;
      }
    }

    $jsPaths = preg_grep('/\.js$/', $paths);
    $command = '';
    if (count($jsPaths) > 0) {
      $command .= 'npm run eslint:alone ' . join(' ', $jsPaths);
    }

    $scssPaths = preg_grep('/\.scss$/', $paths);
    if (count($scssPaths) > 0) {
      if (strlen($command)) {
        $command .= ' && ';
      }

      $command .= 'npm run stylelint:alone ' . join(' ', $scssPaths);
    }

    $cssPaths = preg_grep('/\.css$/', $paths);
    if (count($cssPaths) > 0) {
      if (strlen($command)) {
        $command .= ' && ';
      }

      $command .= 'npm run csslint:alone ' . join(' ', $cssPaths);
    }

    $root = $this->getWorkingCopy()->getProjectRoot();
    $console = PhutilConsole:: getConsole();

    $future = new ExecFuture($command);
    $future->setCWD($root . "/");
    list($exitcode, $stdout, $stderr) = $future->resolve();
    $console->writeOut($stdout);
    $console->writeOut("\n");

    if ($exitcode != 0) {
      $console->writeOut("All code in any code-base should look like a single person typed it, no matter how many people contributed. --idiomatic.js\n");
      $console->writeOut("无论有多少人在维护，所有在代码仓库中的代码理应看起来像同一个人写的。 --idiomatic.js\n");
      $console->writeOut("https://github.com/rwaldron/idiomatic.js/tree/master/translations/zh_CN\n");
      throw new Exception("Keep it in mind!");
    } else {
      $console->writeOut("All code are clean, you did a great job!\n");
    }

    return;
  }

}
