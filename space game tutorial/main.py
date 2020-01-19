import pygame
import random
import math
import csv
import sys
from pygame import mixer

# initialize the game
pygame.init()

# creates the screen width = X, height = Y
screen = pygame.display.set_mode((800, 600))

# Background
background = pygame.image.load('spaceBackgroung.png')

# Background music- repeated playing
mixer.music.load('background.wav')
mixer.music.play(-1)

#Menu page
start_font = pygame.font.Font('Neon.ttf', 64)

# Title and icon of game
pygame.display.set_caption("Space Invaders")
# make sure icon file size is 32px
icon = pygame.image.load('rocket.png')
pygame.display.set_icon(icon)

# Player
# make sure icon file size is 64px
playerImg = pygame.image.load('space-invaders.png')
playerX = 370
playerY = 480
playerXChange = 0

# Enemy
# make sure icon file size is 64px
enemyImg = []
enemyX = []
enemyY = []
enemyXChange = []
enemyYChange = []
numOfEnemies = 6

for i in range(numOfEnemies):
    enemyImg.append(pygame.image.load('monster.png'))
    enemyX.append(random.randint(0, 735))
    enemyY.append(random.randint(50, 150))
    enemyXChange.append(3)
    enemyYChange.append(40)

# Bullet
# Ready state: can't see bullet on screen
# Fire state: bullet is currently moving
# make sure icon file size is 32px
bulletImg = pygame.image.load('bullet.png')
bulletX = 0
bulletY = 480
bulletXChange = 0
bulletYChange = 10
bulletState = "ready"

# Score
scoreValue = 0
font = pygame.font.Font('Neon.ttf', 32)
textX = 10
textY = 10

# game over
over_font = pygame.font.Font('Neon.ttf', 64)

#draws the start menu
def start_game_text():
    startT = start_font.render("Start", True, (255,255,255))
    screen.blit(startT, (200,250))

# draws the score to the screen
def show_score(x, y):
    score = font.render("Score: " + str(scoreValue), True, (255, 255, 255))
    screen.blit(score, (x, y))


# draws the game over function to the screen
def game_over_text():
    overT = over_font.render("GAME OVER ", True, (255, 255, 255))
    screen.blit(overT, (200, 250))


# draws the player icon on the screen
def player(x, y):
    screen.blit(playerImg, (x, y))


# draws the enemy icon on the screen
def enemy(x, y, i):
    screen.blit(enemyImg[i], (x, y))


# fires a bullet
def fire_bullet(x, y):
    global bulletState
    bulletState = "fire"
    screen.blit(bulletImg, (x + 16, y + 10))


# distance between enemy and bullet
def isCollision(enemyX, enemyY, bulletX, bulletY):
    distance = math.sqrt((math.pow(enemyX - bulletX, 2)) + (math.pow(enemyY - bulletY, 2)))
    if distance < 27:
        return True
    else:
        return False


# game loop to make sure window doesn't close immediately
running = True
while running:
    # needed to show up on screen
    screen.fill((219, 20, 73))
    # Background Image
    screen.blit(background, (0, 0))
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        # if keystroke is pressed check whether it's left or right
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                playerXChange = -5
            if event.key == pygame.K_RIGHT:
                playerXChange = 5
            if event.key == pygame.K_SPACE:
                if bulletState == "ready":
                    bulletSound = mixer.Sound('laser.wav')
                    bulletSound.play()
                    # gets the current x coordinate of spaceship
                    bulletX = playerX
                    fire_bullet(bulletX, bulletY)
        if event.type == pygame.KEYUP:
            if event.key == pygame.K_LEFT or event.key == pygame.K_RIGHT:
                playerXChange = 0

    # checking for boundaries so player doesn't go out of bounds
    playerX += playerXChange

    if playerX <= 0:
        playerX = 0
    elif playerX >= 736:
        playerX = 736

    # enemy movement
    for i in range(numOfEnemies):
        # game over
        if enemyY[i] > 440:
            for j in range(numOfEnemies):
                enemyY[j] = 2000
            game_over_text()
            break

        enemyX[i] += enemyXChange[i]

        if enemyX[i] <= 0:
            enemyXChange[i] = 3
            enemyY[i] += enemyYChange[i]
        elif enemyX[i] >= 736:
            enemyXChange[i] = -3
            enemyY[i] += enemyYChange[i]
        # collision
        collision = isCollision(enemyX[i], enemyY[i], bulletX, bulletY)
        if collision:
            explosionSound = mixer.Sound('explosion.wav')
            explosionSound.play()
            bulletY = 480
            bulletState = "ready"
            scoreValue += 1
            enemyX[i] = random.randint(0, 735)
            enemyY[i] = random.randint(50, 150)
        enemy(enemyX[i], enemyY[i], i)

    # bullet movement
    if bulletY <= 0:
        bulletY = 480
        bulletState = "ready"

    if bulletState == "fire":
        fire_bullet(bulletX, bulletY)
        bulletY -= bulletYChange

    player(playerX, playerY)
    show_score(textX, textY)
    # necessary to update screen
    pygame.display.update()
