#include <stdio.h>
#include <stdlib.h>
 /* 定义 */
const int OVERFLOW = -3;
const int ERROR = -2;
const int OK = -1;
const int FALSE = 0;
const int TRUE = 1;
const int LIST_SIZE = 5;
/* 别名定义  */
typedef int Status;
typedef int ElemType;
 
typedef struct {
    ElemType *elem;
    int top;
    int size;
} SqStack;

/* 初始化构造空表 */
Status InitStack(SqStack *S)
{
  S->elem = (ElemType *) malloc(LIST_SIZE * sizeof(ElemType));;
  if (!S->elem) exit(OVERFLOW);
  S->top = 0;
  S->size = LIST_SIZE;
  return OK;
}

/* 自动扩容 */
void expand(SqStack *S)
{
  /* 如果当前长度小于容量 退出*/
  if (S->top < S->size) return;
  /* 扩容最小值应该为默认容量 */
  int size = S->size < LIST_SIZE ? LIST_SIZE : S->size;
  /* 成倍扩容 */
  ElemType *newElem = (ElemType *) malloc(size * 2 * sizeof(ElemType));
  /* 复制元素 */
  for(int i = 0;i < S->top;i++) newElem[i] = S->elem[i];
  free(S->elem);
  S->elem = newElem;
  // L.size+=LIST_ADD;
  S->size = size * 2;
}
/* 自动缩容 */
void shrink(SqStack *S)
{
  /* 当前长度小于默认容量 */
  if (S->top < LIST_SIZE) return;
  /* 如果使用容量大于一半 */
  if (S->top > S->size / 2) return;
  /* 缩容最小值 */
  int size = S->size / 2 > LIST_SIZE ? S->size / 2 : LIST_SIZE;
  ElemType *newElem = (ElemType *) malloc(size * sizeof(ElemType));
  for(int i = 0;i < S->top;i++) newElem[i] = S->elem[i];
  free(S->elem);
  S->elem = newElem;
  S->size = size;
}

Status StackEmpty(SqStack S)
{
  return S.top == 0 ? TRUE : FALSE;
}

int StackSize(SqStack S)
{
  return S.size;
}

Status DestroyStack(SqStack *S)
{
  free(S->elem);
  S->top = 0;
  S->size = 0;
  free(S);
  return OK;
}

Status Push(SqStack *S, ElemType e)
{
  if (S->top == S->size) {
    return OVERFLOW;
  } else {
    S->elem[S->top] = e;
    S->top++;
  }
  if (S->top == S->size) expand(S);
  return OK;
}

Status Pop(SqStack *S, ElemType *e)
{
  if (!S->top) return ERROR;
  S->top--;
  *e = S->elem[S->top];
  shrink(S);
  return OK;
}

Status GetTop(SqStack S, ElemType *e)
{
  if (StackEmpty(S)) return ERROR;
   *e = S.elem[S.top - 1];
  return OK;
}