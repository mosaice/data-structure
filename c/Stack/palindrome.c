#include "CharStack.h"
#include <string.h>

int detect(char *s);

int main(int argc, char *argv[])
{
  char string[100];

  while(1) {
    scanf("%s", string);
    printf("%s\n",  detect(string) ? "Right" : "Wrong");
  }
}

int detect(char *s) {
  char string[100];
  strcpy(string, s);
  SqStack *S = (SqStack *) malloc(sizeof(SqStack));
  InitStack(S);
  char c;
  for (int i = 0; i < strlen(string); i++) {
    Push(S, string[i]);
  }

  while(!StackEmpty(*S)) {
    Pop(S, &c);
    if (c != *s) return 0;
    s++;
  }
  return 1;
}