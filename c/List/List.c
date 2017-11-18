#include "List.h"

void Listlog(ElemType item, int index) {
  printf("index: %d, value: %d\n", index, item);
}

/* 辅助打印状态方法 */
void ListStatus(SqList L) {
  printf("List Length: %d, Size: %d\n", L.length, L.size);
}

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
  SqList *L = (SqList *) malloc(sizeof(SqList));

  printf("初始化列表: %s\n", status(InitList(L)));
  ListStatus(*L);
  printf("\nListEmpty: %s\n", status(ListEmpty(*L)));

  printf("ListInsert 位置： %d 值： %d %s\n", 0, 0, status(ListInsert(L, 0, 0)));
  printf("ListInsert 位置： %d 值： %d %s\n", 5, 1, status(ListInsert(L, 5, 1)));
  printf("ListInsert 位置： %d 值： %d %s\n", 1, 2, status(ListInsert(L, 1, 2)));
  printf("ListInsert 位置： %d 值： %d %s\n", 3, 4, status(ListInsert(L, 3, 4)));
  printf("ListInsert 位置： %d 值： %d %s\n", 5, 6, status(ListInsert(L, 5, 6)));
  printf("ListInsert 位置： %d 值： %d %s\n", 1, 2, status(ListInsert(L, 1, 2)));
  printf("ListInsert 位置： %d 值： %d %s\n", 0, 3, status(ListInsert(L, 0, 3)));
  printf("ListInsert 位置： %d 值： %d %s\n", 4, 5, status(ListInsert(L, 4, 5)));

  LsitTraverse(*L, Listlog);             //遍历打印

  printf("\n测试 自动扩容\n");
  printf("ListInsert 位置： %d 值： %d %s\n", 5, 99, status(ListInsert(L, 5, 99)));
  ListStatus(*L);
  LsitTraverse(*L, Listlog);             //遍历打印

  printf("\n测试 ListLength: %d\n", ListLength(*L));
  printf("\n测试 ListEmpty: %s\n", status(ListEmpty(*L)));

  ElemType e;
  printf("\n测试 GetElem %d 号: %s\n", 0, status(GetElem(*L, 0, &e)));
  printf("取得结果为: %d\n", e);

  printf("\n测试 自动缩容\n");
  printf("ListDelete 位置： %d %s\n", 2, status(ListDelete(L, 2, &e)));
  printf("取得结果为: %d\n", e);
  ListStatus(*L);
  LsitTraverse(*L, Listlog);             //遍历打印  
  
  printf("\n测试 LocateElem 测试值： %d\n", 99);
  int pos = LocateElem(*L, 99);
  printf("99的位置为： %d\n", pos);

  
  printf("\n测试 PriorElem 测试值： %d %s\n", 99, status(PriorElem(*L, 99, &e)));
  printf("取得结果为: %d\n", e);

  printf("\n测试 NextElem 测试值： %d %s\n", 99, status(NextElem(*L, 99, &e)));
  printf("\n测试 NextElem 测试值： %d %s\n", 0, status(NextElem(*L, 0, &e)));
  printf("取得结果为: %d\n", e);
    
  printf("\n测试 DestroyList: %s\n", status(DestroyList(L)));
  ListStatus(*L);
}