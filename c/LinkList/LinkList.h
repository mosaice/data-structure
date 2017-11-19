#include <stdio.h>
#include <stdlib.h>
 /* 定义 */
const int OVERFLOW = -3;
const int ERROR = -2;
const int OK = -1;
const int FALSE = 0;
const int TRUE = 1;
/* 别名定义  */
typedef int Status;
typedef int ElemType;

typedef struct LNode{
    ElemType data;
    struct LNode *next;
    struct LNode *prev;
} LNode;

typedef struct{
    struct LNode *header;
    struct LNode *tailer;
    int length;
} LinkList;

/* 初始化链表L */
Status InitList(LinkList *L);
/* 判断链表L是否为空 */
Status ListEmpty(LinkList L);
/* 获取第一个节点的值 */
Status FirstElem(LinkList L, ElemType *e);
/* 获取最后一个节点的值 */
Status LastElem(LinkList L,ElemType *e);
/* 求链表长度 */
int ListLength(LinkList L);
/* 销毁链表 */
Status DestroyList(LinkList *L);
/* 获取某个元素 */
Status GetElem(LinkList L, int i, ElemType *e);
/* 前插法 插入元素 */
Status ListInsert(LinkList *L, int i, ElemType e);
// /* 删除元素 */
Status ListDelete(LinkList *L, int i, ElemType *e);
/* 正序遍历链表 */
void LsitTraverse(LinkList L, void (* fun)(ElemType, int));
/* 逆序遍历链表 */
void LsitReverseTraverse(LinkList L, void (* fun)(ElemType, int));
/* 获取位置 */
int LocateElem(LinkList L, ElemType e);
/* 获取前驱元素 */
Status PriorElem(LinkList L, ElemType cur_e, ElemType *pre_e);
/* 获取后继元素 */
Status NextElem(LinkList L, ElemType cur_e, ElemType *next_e);

Status InitList(LinkList *L)
{
  LNode *header = (LNode *) malloc(sizeof(LNode));
  LNode *tailer = (LNode *) malloc(sizeof(LNode));
  header->next = tailer;
  header->prev = NULL;
  tailer->prev = header;
  tailer->next = NULL;
  L->length = 0;
  L->header = header;
  L->tailer = tailer;
  return OK;
}

Status ListEmpty(LinkList L)
{
  return L.length == 0 ? TRUE : FALSE;
}

Status FirstElem(LinkList L, ElemType *e)
{
  if (!L.length) return ERROR;
  *e = L.header->next->data;
  return OK;
}

Status LastElem(LinkList L,ElemType *e)
{
  if (!L.length) return ERROR;
  *e = L.tailer->prev->data;
  return OK;
}
  

int ListLength(LinkList L)
{
  return L.length;
}

Status DestroyList(LinkList *L)
{
  while(L->length--) {
    LNode *p = L->header->next;
    L->header->next = p->next;
    p->next->prev = L->header;
    free(p);
  }
  free(L->header);
  free(L->tailer);
  free(L);
  return OK;
}

Status GetElem(LinkList L, int i, ElemType *e)
{
  if (i < 0 || i > L.length - 1) return ERROR;
  LNode *p = L.header->next;
  int j = 0;
  while(p->next && j < i) {
    p=p->next;
    j++;
  }
  // if (!p || j) return ERROR;
  *e = p->data;
  return OK;
}

Status ListInsert(LinkList *L, int i, ElemType e)
{
  if (i < 0 || i > L->length) return ERROR;
  LNode *p = L->header->next;
  int j = 0;
  while(p->next && j < i) {
    p=p->next;
    j++;
  }
  LNode *node = (LNode *) malloc(sizeof(LNode));
  node->data = e;
  node->prev = p->prev;
  node->next = p;
  p->prev->next = node;
  p->prev = node;
  L->length++;
  return OK;
}

Status ListDelete(LinkList *L, int i, ElemType *e)
{
  if (i < 0 || i > L->length - 1) return ERROR;
  LNode *p = L->header->next;
  int j = 0;
  while(p->next && j < i) {
    p=p->next;
    j++;
  }
  *e = p->data;
  p->next->prev = p->prev;
  p->prev->next = p->next;
  free(p);
  L->length--;
  return OK;
}

void LsitTraverse(LinkList L, void (* fun)(ElemType, int))
{
  LNode *p = L.header->next;
  int i = 0;
  while(p->next) {
    fun(p->data, i++);
    p=p->next;
  }
}

void LsitReverseTraverse(LinkList L, void (* fun)(ElemType, int))
{
  LNode *p = L.tailer->prev;
  int i = 0;
  while(p->prev) {
    fun(p->data, i++);
    p=p->prev;
  }
}

int LocateElem(LinkList L, ElemType e)
{
  LNode *p = L.header->next;
  int i = 0;
  while(p->next) {
    if (p->data == e) return i;
    p=p->next;
    i++;
  }
  return -1;
}

Status PriorElem(LinkList L, ElemType cur_e, ElemType *pre_e)
{
  int pos = LocateElem(L, cur_e);
  if (pos < 1) return ERROR;
  GetElem(L, --pos, pre_e);
  return OK;
}

Status NextElem(LinkList L, ElemType cur_e, ElemType *next_e)
{
  int pos = LocateElem(L, cur_e);
  if (pos == -1 || pos > L.length - 2) return ERROR;
  GetElem(L, ++pos, next_e);
  return OK;
}

