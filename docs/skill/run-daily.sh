#!/bin/bash
# AI日报自动生成脚本
# 每天9:00由cron调用，使用Claude Code CLI执行ai-daily skill
#
# 部署方式：
# 1. 复制本文件到任意位置
# 2. 设置下方 USER_HOME 变量为你的 home 目录
# 3. 添加到 crontab: 0 9 * * * /bin/bash /path/to/run-daily.sh >> /path/to/logs/cron.log 2>&1
set -euo pipefail

# === 用户配置（根据实际环境修改） ===
USER_HOME="${USER_HOME:-$HOME}"
export HOME="$USER_HOME"
export PATH="$USER_HOME/.npm-global/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
export TZ="Asia/Shanghai"

CLAUDE_CLI="$USER_HOME/.npm-global/bin/claude"
PROJECT_DIR="$USER_HOME/.claude/ai-daily-web"
LOG_DIR="$USER_HOME/.claude/skills/ai-daily/logs"

TODAY=$(date +%Y-%m-%d)
NOW=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="${LOG_DIR}/${TODAY}.log"

mkdir -p "$LOG_DIR"

echo "=== AI日报生成开始 ${TODAY} ${NOW} ===" >> "$LOG_FILE"

# 前置检查
if [ ! -x "$CLAUDE_CLI" ]; then
  echo "[ERROR] claude CLI 不可执行: $CLAUDE_CLI" >> "$LOG_FILE"
  exit 1
fi

# 检查认证状态
AUTH_CHECK=$("$CLAUDE_CLI" -p "确认" --print 2>&1 | head -1)
if echo "$AUTH_CHECK" | grep -qi "error\|unauthorized\|login"; then
  echo "[ERROR] Claude CLI 认证失败: $AUTH_CHECK" >> "$LOG_FILE"
  exit 1
fi
echo "[INFO] 认证检查通过" >> "$LOG_FILE"

cd "$PROJECT_DIR"

"$CLAUDE_CLI" -p "今天是${TODAY}（北京时间）。整理今天的日报。按SKILL.md的工作流程执行（news-first策略）：1)先用brave_news_search批量采集(3次) 2)补漏web_search(0-2次) 3)日期验证 4)信息甄别 5)更新store.ts 6)npm run build 7)vercel --prod --yes部署。完成后输出今日录入条目数和API调用次数。" \
  --allowedTools "WebSearch,mcp__brave-search__brave_web_search,mcp__brave-search__brave_news_search,mcp__brave-search__brave_summarizer,Read,Edit,Write,Bash,Glob,Grep" \
  --model sonnet \
  >> "$LOG_FILE" 2>&1

EXIT_CODE=$?

echo "=== AI日报生成完成 $(date '+%Y-%m-%d %H:%M:%S') exit=$EXIT_CODE ===" >> "$LOG_FILE"

exit $EXIT_CODE
