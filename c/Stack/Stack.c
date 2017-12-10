#include "Stack.h"

char *status(Status i) {
  switch (i) {
    case -3:
      return "OVERFLOW";
    case -2:
      return "ERROR";
    case -1:
      return "OK";
    case 0:
      return "FALSE";
    case 1:
      return "TRUE";
    default:
      break;
  }
  return "";
}

int main(int argc, char *argv[]) {
  SqStack *S = (SqStack *) malloc(sizeof(SqStack));
  printf("初始化栈: %s\n", status(InitStack(S)));
  printf("是否为空: %s\n", status(StackEmpty(*S)));
  ElemType *e = (ElemType *) malloc(sizeof(ElemType));
  printf("获取栈顶元素: %s\n", status(GetTop(*S, e)));
  printf("查看栈当前容量: %d\n", StackSize(*S));
  printf("PUSH 入栈: %s\n", status(Push(S, 1)));
  printf("PUSH 入栈: %s\n", status(Push(S, 2)));
  printf("PUSH 入栈: %s\n", status(Push(S, 3)));
  printf("PUSH 入栈: %s\n", status(Push(S, 4)));
  printf("PUSH 入栈: %s\n", status(Push(S, 5)));
  printf("PUSH 入栈: %s\n", status(Push(S, 6)));
  printf("查看栈当前容量: %d\n", StackSize(*S));
  printf("获取栈顶元素: %s\n", status(GetTop(*S, e)));
  printf("栈顶元素: %d\n", *e);
  printf("POP 出栈: %s\n", status(Pop(S, e)));
  printf("出栈元素: %d\n", *e);
  printf("POP 出栈: %s\n", status(Pop(S, e)));
  printf("出栈元素: %d\n", *e);
  printf("POP 出栈: %s\n", status(Pop(S, e)));
  printf("出栈元素: %d\n", *e);
  printf("查看栈当前容量: %d\n", StackSize(*S));  
  

}