#include "CharStack.h"

char word[16] = {'0', '1', '2', '3', '4' ,'5' ,'6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
void transform(int num, int digit);

int main(int argc, char *argv[])
{
  int num = 0;
  while(1) {
    scanf("%d", &num);
    transform(num, 2);
    transform(num, 8);
    transform(num, 10);
    transform(num, 16);
    printf("\n");
  }
}

void transform(int num, int digit)
{
  SqStack *S = (SqStack *) malloc(sizeof(SqStack));
  InitStack(S);
  int n = num;
  char c;
  while(n) {
    Push(S, word[n % digit]);
    n /= digit;
  }
  printf("%d %d 位是： ", num, digit);

  while(!StackEmpty(*S)) {
    Pop(S, &c);
    printf("%c", c);
  }
  printf("\n");
}